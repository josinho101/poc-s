package com.josinho.rest.services.modals;

import java.util.Date;

public class Post {
	private Integer id;
	private Integer userId;
	private String content;
	private Date createdDate;
	
	public Post(Integer id, Integer userId, String content,Date createdDate) {
		super();
		this.id = id;
		this.userId = userId;
		this.content = content;
		this.createdDate = createdDate;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
}
