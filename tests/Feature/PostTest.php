<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Post;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class PostTest extends TestCase
{
    use RefreshDatabase;


    #[Test]
    public function guests_cannot_access_create_post_page(): void
    {
        $response = $this->get(route('posts.create'));
        $response->assertRedirect(route('login'));
    }


    #[Test]
    public function authenticated_user_can_create_post(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)
            ->post(route('posts.store'), [
                'title' => 'Test Post',
                'content' => 'This is a test content',
            ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('posts', [
            'title' => 'Test Post',
            'content' => 'This is a test content',
            'user_id' => $user->id,
        ]);
    }


    #[Test]
    public function post_owner_can_update_post(): void
    {
        $user = User::factory()->create();
        $post = Post::factory()->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)
            ->put(route('posts.update', $post), [
                'title' => 'Updated Title',
                'content' => 'Updated content',
            ]);

        $response->assertRedirect(route('posts.show', $post));
        $this->assertDatabaseHas('posts', [
            'id' => $post->id,
            'title' => 'Updated Title',
            'content' => 'Updated content',
        ]);
    }


    #[Test]
    public function non_owner_cannot_update_post(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $post = Post::factory()->create(['user_id' => $user->id]);

        $response = $this->actingAs($otherUser)
            ->put(route('posts.update', $post), [
                'title' => 'Malicious Update',
                'content' => 'Trying to update another user post',
            ]);

        $response->assertStatus(403);
    }
}
