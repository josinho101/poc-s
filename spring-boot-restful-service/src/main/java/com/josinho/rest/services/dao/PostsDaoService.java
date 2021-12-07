package com.josinho.rest.services.dao;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Component;

import com.josinho.rest.services.modals.Post;

@Component
public class PostsDaoService {
	private static List<Post> posts = new ArrayList<>();
	private static int postCount = 5;

	static {
		posts.add(new Post(1, 1, "My first post", new Date()));
		posts.add(new Post(2, 1, "Yet another post", new Date()));
		posts.add(new Post(3, 2, "A new content", new Date()));
		posts.add(new Post(4, 2, "Checkout my new post", new Date()));
		posts.add(new Post(5, 3, "This is my final post!", new Date()));
	}

	public List<Post> findAll(int userId) {
		return posts.stream().filter(p -> p.getUserId() == userId).toList();
	}

	public Post findOne(int id, int userId) {
		for (Post post : posts) {
			if (post.getId() == id && post.getUserId() == userId) {
				return post;
			}
		}

		return null;
	}

	public Post save(Post post) {
		if (post.getId() == null) {
			post.setId(++postCount);
		}

		posts.add(post);

		return post;
	}
}
