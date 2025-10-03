<?php


namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class PostFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::query()->inRandomOrder()->first()?->id ?? User::factory(),
            'title' => $this->faker->sentence,
            'content' => $this->faker->paragraph(5),
        ];
    }
}
