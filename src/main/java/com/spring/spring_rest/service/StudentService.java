package com.spring.spring_rest.service;

import java.util.List;
import com.spring.spring_rest.dto.StudentDto;

/**
 * Defines operations for managing student records.
 */
public interface StudentService {

    /**
     * Creates a student.
     *
     * @param theStudentDto the student data
     * @return the created student
     */
    StudentDto createStudent(StudentDto theStudentDto);

    /**
     * Gets a student by identifier.
     *
     * @param theId the student identifier
     * @return the matching student
     */
    StudentDto getStudentById(Long theId);

    /**
     * Gets all students.
     *
     * @return the student records
     */
    List<StudentDto> getAllStudents();

    /**
     * Replaces a student's data.
     *
     * @param theId the student identifier
     * @param theStudentDto the updated student data
     * @return the updated student
     */
    StudentDto updateStudent(Long theId, StudentDto theStudentDto);

    /**
     * Partially updates a student.
     *
     * @param theId the student identifier
     * @param thStudentDto the partial student data
     * @return the updated student
     */
    StudentDto patchStudent(Long theId, StudentDto thStudentDto);

    /**
     * Deletes a student.
     *
     * @param theId the student identifier
     */
    void deleteStudentById(Long theId);
}