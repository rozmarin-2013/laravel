<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Gate;

class PostController extends Controller
{
    public function index(): Response
    {
        $posts = Post::with('user')->latest()->paginate(10);

        return Inertia::render('Posts/Index', ['posts' => $posts]);
    }

    public function create(): Response
    {
        return Inertia::render('Posts/Create', []);
    }

    public function store(PostRequest $request): RedirectResponse
    {
        $post = $request->user()->posts()->create([
            'title' => $request->input('title'),
            'content' => $request->input('content'),
        ]);

        return redirect()->route('posts.show', $post);
    }

    public function show(Post $post): Response
    {
        $post->load(['user', 'comments.user']);

        return Inertia::render('Posts/Show', ['post' => $post]);
    }

    public function edit(Post $post): Response
    {
        Gate::authorize('update', $post);

        return Inertia::render('Posts/Edit', ['post' => $post]);
    }

    public function update(PostRequest $request, Post $post): RedirectResponse
    {
        Gate::authorize('update', $post);

        $post->update([
            'title' => $request->input('title'),
            'content' => $request->input('content')
        ]);

        return redirect()->route('posts.show', $post);
    }

    public function destroy(Post $post): RedirectResponse
    {
        Gate::authorize('delete', $post);

        $post->delete();

        return redirect()->route('posts.index');
    }
}
