package com.sprintbootsample.sprintbootsample.controllers;

import com.sprintbootsample.sprintbootsample.models.Candidate;
import com.sprintbootsample.sprintbootsample.services.CandidatesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "api/v1/candidates")
public class CandidatesController {

    private CandidatesService candidateService;

    @Autowired
    public CandidatesController(CandidatesService candidateService) {
        this.candidateService = candidateService;
    }

    @GetMapping
    public List<Candidate> getAll() {
        return this.candidateService.getAll();
    }
}
