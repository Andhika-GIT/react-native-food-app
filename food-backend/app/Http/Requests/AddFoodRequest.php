<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddFoodRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => 'required|max:255',
            'picturePath' => 'required|image',
            'description' => 'required',
            'ingredients' => 'required',
            'price' => 'required|integer',
            'rate' => 'required|numeric',
            'types' => '',
        ];
    }
}
