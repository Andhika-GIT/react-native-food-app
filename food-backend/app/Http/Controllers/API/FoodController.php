<?php

namespace App\Http\Controllers\API;

use App\Helpers\ResponseFormatter;
use App\Http\Controllers\Controller;
use App\Models\Food;
use Illuminate\Http\Request;

class FoodController extends Controller
{
    public function all(Request $request)
    {
        $id = $request->input('id');
        $limit = $request->input('limit', 6);
        $name = $request->input('name');
        $types = $request->input('types');

        // filtering harga
        $price_from = $request->input('price_from');
        $price_to = $request->input('price_to');

        // filtering rating
        $rate_from = $request->input('rate_from');
        $rate_to = $request->input('rate_to');

        if ($id) {
            $food = Food::find($id);

            // jika ditemukan makanan berdasarkan id
            if ($food) {

                // kirimkan response sukses, beserta data makanan nya
                return ResponseFormatter::success(
                    $food,
                    'Food data sucessfully sent'
                );
            }

            // jika tidak ditemukan makanan berdasarkan id
            else {
                return ResponseFormatter::error(
                    null,
                    'Food data not found',
                    404
                );
            }
        }

        $food = Food::query();


        // jalankan query, berdasarkan request yang diterma dari frontend

        if ($name) {
            $food->where('name', 'like', '%' . $name . '%');
        }

        if ($types) {
            $food->where('types', 'like', '%' . $types . '%');
        }

        // query untuk filter harga dari dan harga sampai

        if ($price_from) {
            $food->where('price', '>=', $price_from);
        }

        if ($price_to) {
            $food->where('price', '<=', $price_to);
        }

        // query untuk filter rate dari dan rate sampai

        if ($rate_from) {
            $food->where('rate', '>=', $rate_from);
        }

        if ($rate_to) {
            $food->where('rate', '<=', $rate_to);
        }

        // kirimkan response data makanan berdasarkan query
        return ResponseFormatter::success(
            $food->paginate($limit),
            'Data list produk berhasil diambil'
        );
    }
}
