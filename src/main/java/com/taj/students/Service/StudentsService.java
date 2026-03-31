package com.taj.students.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.taj.students.Entity.Students;
import com.taj.students.Repository.StudentsRepo;

import jakarta.annotation.PostConstruct;

@Service
public class StudentsService {
    
    private final StudentsRepo studentsRepo;

    public StudentsService(StudentsRepo studentsRepo) {
        this.studentsRepo = studentsRepo;
    }

    
    @PostConstruct
    public void SaveData(){

        if(studentsRepo.count()==0){

            Students students=new Students();
            students.setName("Rehman");
            students.setCourse("DEVOPS");
            students.setEmail("test@gmail.com");

            studentsRepo.save(students);
        }
    }


    public List<Students> getAllStudents(){
        return studentsRepo.findAll();
    }

}
