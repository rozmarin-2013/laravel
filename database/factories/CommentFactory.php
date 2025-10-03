<?php


namespace Database\Factories;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class CommentFactory extends Factory
{
    public function definition(): array
    {
        return [
            'post_id' => Post::query()->inRandomOrder()->first()?->id ?? Post::factory(),
            'user_id' => User::query()->inRandomOrder()->first()?->id ?? User::factory(),
            'comment' => $this->faker->sentence(12),
        ];
    }
}
