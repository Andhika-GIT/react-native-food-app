<?php

namespace App\Http\Controllers\API;

use Exception;
use Midtrans\Snap;
use Midtrans\Config;
use App\Models\Transaction;
use Illuminate\Http\Request;
use App\Helpers\ResponseFormatter;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class TransactionController extends Controller
{
    public function all(Request $request)
    {
        $id = $request->input('id');
        $limit = $request->input('limit', 6);
        $food_id = $request->input('food_id');
        $status = $request->input('status');


        if ($id) {
            $transaction = Transaction::with(['food', 'user'])->find($id);

            // jika ditemukan makanan berdasarkan id
            if ($transaction) {

                // kirimkan response sukses, beserta data makanan nya
                return ResponseFormatter::success(
                    $transaction,
                    'Transaction data sucessfully sent'
                );
            }

            // jika tidak ditemukan makanan berdasarkan id
            else {
                return ResponseFormatter::error(
                    null,
                    'Transaction data not found',
                    404
                );
            }
        }

        // cari data transaction hanya berdasarkan id user yang sedang login
        $transaction = Transaction::with(['food', 'user'])
            ->where('user_id', Auth::user()->id);

        // jalankan query berdasarkan request dari frontend
        if ($food_id) {
            $transaction->where('food_id', $food_id);
        }

        if ($status) {
            $transaction->where('status', $status);
        }


        // kirimkan response data makanan berdasarkan query
        return ResponseFormatter::success(
            $transaction->paginate($limit),
            'List transaction successfully sent'
        );
    }

    // testing untuk update transaksi
    public function update(Request $request, $id)
    {
        $transaction = Transaction::findOrFail($id);

        $transaction->update($request->all());

        return ResponseFormatter::success(
            $transaction,
            'Successfully update transaction'
        );
    }

    public function checkout(Request $request)
    {

        // validasi data
        $validatedData =  $request->validate([
            'food_id' => 'required|exists:food,id',
            'user_id' => 'required|exists:users,id',
            'quantity' => 'required',
            'total' => 'required',
            'status' => 'required'
        ]);

        // masukkan data transaksi dari request ke database
        // data ini akan digunakan lagi setelah dibuat
        $transaction = Transaction::create([
            'food_id' => $request->food_id,
            'user_id' => $request->user_id,
            'quantity' => $request->quantity,
            'total' => $request->total,
            'status' => $request->status,
            'payment_url' => ''
        ]);


        // konfigurasi MidTrans
        Config::$serverKey = config('services.midtrans.serverKey');
        Config::$isProduction = config('services.midtrans.isProduction');
        Config::$isSanitized = config('services.midtrans.isSanitized');
        Config::$is3ds = config('services.midtrans.is3ds');

        // panggil transaksi yang baru dibuat
        $transaction = Transaction::with(['food', 'user'])->find($transaction->id);

        // membuat transaksi Midtrans
        $midTrans = [
            'transaction_details' => [
                'order_id' => $transaction->id,
                'gross_amount' => (int) $transaction->total,

            ],
            'costumer_details' => [
                'first_name' => $transaction->user->name,
                'email' => $transaction->user->email
            ],
            'enable_payments' => [
                'gopay',
                'bank_transfer'
            ],
            'vtweb' => []
        ];

        // memanggil Midtrans
        try {
            // ambil halaman payment midtrans
            $paymentUrl = Snap::createTransaction($midTrans)->redirect_url;

            // update payment url untuk data transaksi yang baru dibuat
            $transaction->payment_url = $paymentUrl;
            $transaction->save();

            // jika berhasil, kembalikan response yang barisi data transaksi baru ke API
            return ResponseFormatter::success(
                $transaction,
                'Transaction Successful'
            );
        }

        // jika transaksi gagal 
        catch (Exception $e) {
            // kirimkan 
            return ResponseFormatter::error(
                $e->getMessage(),
                'Transaction Failed'
            );
        }
    }
}
