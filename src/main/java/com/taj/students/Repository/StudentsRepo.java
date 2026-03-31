package com.taj.students.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.taj.students.Entity.Students;

@Repository
public interface StudentsRepo extends JpaRepository<Students, Integer> {
    
}
