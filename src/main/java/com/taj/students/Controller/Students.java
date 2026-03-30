package com.taj.students.Controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Students {

    // GetStudents

    @GetMapping("/students")
    public String getStudents() {
        return "GET STUDENTS";
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
