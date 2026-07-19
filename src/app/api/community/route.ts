import { NextResponse } from "next/server";
import { getDb, writeDb, CommunityPost } from "@/lib/db";
import crypto from "crypto";

export async function GET(request: Request) {
  try {
    const db = getDb();
    // Return posts sorted by latest first
    const sortedPosts = [...db.posts].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return NextResponse.json({ posts: sortedPosts });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const token = authHeader.split(" ")[1];
    
    const db = getDb();
    const currentUser = db.users.find(u => u.walletAddress === token);
    
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!currentUser.isGraduated) {
      return NextResponse.json({ error: "Only TON Graduates can post." }, { status: 403 });
    }

    const { content } = await request.json();
    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      return NextResponse.json({ error: "Invalid content" }, { status: 400 });
    }

    const newPost: CommunityPost = {
      id: crypto.randomUUID(),
      userId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      content: content.trim(),
      likes: [],
      comments: [],
      createdAt: new Date().toISOString()
    };

    db.posts.push(newPost);
    writeDb(db);

    return NextResponse.json({ success: true, post: newPost });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const token = authHeader.split(" ")[1];
    
    const db = getDb();
    const currentUser = db.users.find(u => u.walletAddress === token);
    
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { postId, action, content } = await request.json();
    if (!postId || !['like', 'unlike', 'comment'].includes(action)) {
      return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
    }

    const postIndex = db.posts.findIndex(p => p.id === postId);
    if (postIndex === -1) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const post = db.posts[postIndex];

    if (action === 'comment') {
      if (!content || content.trim() === "") {
        return NextResponse.json({ error: "Comment content required" }, { status: 400 });
      }
      const newComment = {
        id: "comment-" + Math.random().toString(36).substring(2, 9),
        userId: currentUser.id,
        authorName: currentUser.name || "Anonymous",
        authorAvatar: currentUser.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${currentUser.name}`,
        content: content.trim(),
        createdAt: new Date().toISOString()
      };
      if (!post.comments) post.comments = [];
      post.comments.push(newComment);
      writeDb(db);
      return NextResponse.json({ success: true, comments: post.comments });
    }

    const hasLiked = post.likes.includes(currentUser.id);
    if (action === 'like' && !hasLiked) {
      post.likes.push(currentUser.id);
    } else if (action === 'unlike' && hasLiked) {
      post.likes = post.likes.filter(id => id !== currentUser.id);
    }

    writeDb(db);
    return NextResponse.json({ success: true, likes: post.likes });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
