package com.taj.students.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taj.students.Entity.Students;
import com.taj.students.Service.StudentsService;

@RestController
public class StudentsController {


    private final StudentsService service;

    public StudentsController(StudentsService service) {
        this.service=service;
    }

    // GetStudents

    @GetMapping("/students")
    public List<Students> getStudents() {
        return service.getAllStudents();
    }

    // SaveStudents
    @PostMapping("/saveStudents")
    public String saveStudents() {
        return "SAVE STUDENTS";
    }

    // UpdateStudents
    @PutMapping("/updateStudents")
    public String updateStudents() {
        return "UPDATE STUDENTS";
    }

    // DeleteStudents
    @DeleteMapping("/deleteStudents")
    public String deleteStudents() {
        return "DELETE STUDENTS";
    }

}
