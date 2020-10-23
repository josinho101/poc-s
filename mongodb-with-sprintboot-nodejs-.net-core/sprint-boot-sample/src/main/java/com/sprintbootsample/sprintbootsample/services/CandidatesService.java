package com.sprintbootsample.sprintbootsample.services;

import com.sprintbootsample.sprintbootsample.dao.CandidatesDao;
import com.sprintbootsample.sprintbootsample.models.Candidate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CandidatesService {
    private final CandidatesDao candidatesDao;

    @Autowired
    public CandidatesService(CandidatesDao candidatesDao) {
        this.candidatesDao = candidatesDao;
    }

    public List<Candidate> getAll() {
        return this.candidatesDao.findAll();
    }
}
