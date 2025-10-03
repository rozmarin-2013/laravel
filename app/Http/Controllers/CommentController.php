<?php

namespace App\Http\Controllers;

use App\Http\Requests\CommentRequest;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class CommentController extends Controller
{
    public function store(CommentRequest $request, Post $post): RedirectResponse
    {
        $post->comments()->create([
            'user_id' => Auth::id(),
            'comment' => $request->input('comment'),
        ]);

        return back()->with('success', 'Comment added successfully.');
    }

    public function destroy(Comment $comment): RedirectResponse
    {
        Gate::authorize('delete', $comment);

        $comment->delete();

        return back()->with('success', 'Comment deleted successfully.');
    }
}

