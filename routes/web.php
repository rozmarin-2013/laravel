<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

Route::get('/', fn() => inertia('Home'))->name('home');

Route::middleware('auth')->group(function () {
    Route::resource('posts', PostController::class)->withoutMiddlewareFor(['index', 'show'], ['auth']);
});


Route::middleware('auth')->group(function () {
    Route::delete('/comments/{comment}', [CommentController::class, 'destroy'])->name('comments.destroy');
});

Route::post('/posts/{post}/comments', [CommentController::class, 'store'])->name('comments.store');

require __DIR__.'/auth.php';
