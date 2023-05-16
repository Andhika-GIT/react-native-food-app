<?php

namespace App\Http\Controllers\API;

use App\Helpers\ResponseFormatter;
use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Http\Request;
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
}
