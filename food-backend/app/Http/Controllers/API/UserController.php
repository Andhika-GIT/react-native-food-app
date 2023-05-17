<?php

namespace App\Http\Controllers\API;

use App\Actions\Fortify\PasswordValidationRules;
use App\Helpers\ResponseFormatter;
use App\Http\Controllers\Controller;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    // buat validasi password (library laravel)
    use PasswordValidationRules;

    public function login(Request $request)
    {
        // validasi input
        try {
            $request->validate([
                'email' => 'email|required',
                'password' => 'required'
            ]);

            // check kredential (login)
            $credentials = request(['email', 'password']);

            // jika login gagal, kirimkan pesan error ke frontend
            if (!Auth::attempt($credentials)) {
                return ResponseFormatter::error([
                    'message' => 'Unauthorized'
                ], 'Authentication Failed', 500);
            }

            // ambil data user berdasarkan request email
            $user = User::where('email', $request->email)->first();

            // jika password salah
            if (!Hash::check($request->password, $user->password, [])) {
                // kirim error ke catch{} block
                throw new \Exception('Invalid Credentials');
            }

            // jika email dan password sesuai, bikin token untuk dikirim ke frontend
            $tokenResult = $user->createToken('authToken')->plainTextToken;
            return ResponseFormatter::success([
                'access_token' => $tokenResult,
                'token_type' => 'Bearer',
                'user' => $user
            ], 'Authenticated');
        }


        // menangkap error dari try block, dan mengirimkan pesan error 
        catch (Exception $error) {
            return ResponseFormatter::error([
                'message' => 'Something went wrong',
                'error' => $error
            ], 'Authentication Failed', 500);
        }
    }

    public function register(Request $request)
    {
        try {
            $request->validate([
                'name' => ['required', 'string', 'max:255'],
                'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
                'password' => $this->passwordRules()
            ]);

            // masukkan data user ke data
            User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'address' => $request->address,
                'houseNumber' => $request->houseNumber,
                'phoneNumber' => $request->phoneNumber,
                'city' => $request->city,
            ]);

            $user = User::where('email', $request->email)->first();

            // jika email dan password sesuai, bikin token untuk dikirim ke frontend
            $tokenResult = $user->createToken('authToken')->plainTextToken;

            // kirim response berhasil ke frontend
            return ResponseFormatter::success([
                'access_token' => $tokenResult,
                'token_type' => 'Bearer',
                'user' => $user
            ], 'User Registered');
        }


        // menangkap error dari try block, dan mengirimkan pesan error 
        catch (Exception $error) {
            return ResponseFormatter::error([
                'message' => 'Something went wrong',
                'error' => $error,
            ], 'Authentication Failed', 500);
        }
    }

    public function logout(Request $request)
    {
        // hapus data token dari user yang sedang login
        $token = $request->user()->currentAccessToken()->delete();

        return ResponseFormatter::success($token, 'Token Revoked');
    }

    public function updateProfile(Request $request)
    {
        $data = $request->all();

        // check validasi data user
        $user = Auth::user();

        $user->update($data);

        return ResponseFormatter::success($user, 'Profile Updated');
    }

    // API agar frontend bisa mengambil data user yang sedang login
    public function fetch(Request $request)
    {
        return ResponseFormatter::success($request->user(), 'User data sucessfully has send sucessfully');
    }

    public function updatePhoto(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'file' => 'required|image|max:2048'
        ]);

        // jika validasi gambar gagal
        if ($validator->fails()) {
            // kirimkan pesan error ke frontend
            return ResponseFormatter::error(
                ['error' => $validator->errors()],
                'Update photo fails',
                401
            );
        }

        // jika validasi berhasil
        if ($request->file('file')) {
            // masukkan nama gambar ke storage
            $file = $request->file->store('assets/user', 'public');

            // ambil data user yang sedang login
            $user = Auth::user();

            // supdate gambar user yang sedang login, simpan ke database
            $user->profile_photo_path = $file;
            $user->update();

            // kirimkan pesan success ke frontend
            return ResponseFormatter::success([$file], 'File successfully updated');
        }
    }
}
