<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Post;
use App\Models\Comment;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class CommentTest extends TestCase
{
    use RefreshDatabase;


    #[Test]
    public function authenticated_user_can_comment_on_post()
    {
        $user = User::factory()->create();
        $post = Post::factory()->create();

        $response = $this->actingAs($user)
            ->post(route('comments.store', $post), [
                'comment' => 'Nice post!',
            ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('comments', [
            'comment' => 'Nice post!',
            'user_id' => $user->id,
            'post_id' => $post->id,
        ]);
    }



    #[Test]
    public function comment_owner_can_delete_comment()
    {
        $user = User::factory()->create();
        $post = Post::factory()->create();
        $comment = Comment::factory()->create([
            'user_id' => $user->id,
            'post_id' => $post->id
        ]);

        $response = $this->actingAs($user)
            ->delete(route('comments.destroy', $comment));

        $response->assertRedirect();
        $this->assertDatabaseMissing('comments', ['id' => $comment->id]);
    }
}
