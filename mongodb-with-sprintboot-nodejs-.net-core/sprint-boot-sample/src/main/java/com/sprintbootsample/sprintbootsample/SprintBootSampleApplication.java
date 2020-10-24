package com.sprintbootsample.sprintbootsample;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sprintbootsample.sprintbootsample.dao.CandidatesDao;
import com.sprintbootsample.sprintbootsample.models.Candidate;
import com.sprintbootsample.sprintbootsample.services.CandidatesService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@SpringBootApplication
public class SprintBootSampleApplication {

	public static void main(String[] args) {
		SpringApplication.run(SprintBootSampleApplication.class, args);
	}

    @Bean
    CommandLineRunner runner(CandidatesDao candidatesDao) {
        return args -> {
            // read json and write to db
            ObjectMapper mapper = new ObjectMapper();
            TypeReference<List<Candidate>> typeReference = new TypeReference<List<Candidate>>(){};
            InputStream inputStream = TypeReference.class.getResourceAsStream("/data/candidates.json");
            try {
                var candidateInDb = candidatesDao.findAll();
                if(candidateInDb.size() > 0) {
                    System.out.println("Candidates already in database!");
                }else {
                    List<Candidate> candidates = mapper.readValue(inputStream, typeReference);
                    candidatesDao.saveAll(candidates);
                    System.out.println("Candidates saved!");
                }
            } catch (IOException e){
                System.out.println("Unable to save candidates: " + e.getMessage());
            }
        };
    }


}
