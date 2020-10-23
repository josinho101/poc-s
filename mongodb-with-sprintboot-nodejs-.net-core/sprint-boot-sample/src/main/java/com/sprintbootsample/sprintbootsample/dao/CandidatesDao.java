package com.sprintbootsample.sprintbootsample.dao;

import com.sprintbootsample.sprintbootsample.models.Candidate;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CandidatesDao extends MongoRepository<Candidate, String> {
}
