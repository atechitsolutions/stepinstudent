package com.atech.backend.controller;

import com.atech.backend.entity.Project;
import com.atech.backend.service.ProjectService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "http://localhost:5173")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    // ===============================
    // PUBLIC - GET ALL PROJECTS
    // ===============================
    @GetMapping
    public List<Project> getProjects() {
        return projectService.getAllProjects();
    }

    // ===============================
    // PUBLIC - GET PROJECT
    // ===============================
    @GetMapping("/{id}")
    public Project getProject(@PathVariable Long id) {
        return projectService.getProject(id);
    }

    // ===============================
    // ADMIN - CREATE PROJECT
    // ===============================
    @PostMapping
    public Project createProject(@RequestBody Project project) {
        return projectService.createProject(project);
    }

    // ===============================
    // ADMIN - UPDATE PROJECT
    // ===============================
    @PutMapping("/{id}")
    public Project updateProject(
            @PathVariable Long id,
            @RequestBody Project project
    ) {
        return projectService.updateProject(id, project);
    }

    // ===============================
    // ADMIN - DELETE PROJECT
    // ===============================
    @DeleteMapping("/{id}")
    public void deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
    }

    // ===============================
    // ADMIN - UPLOAD PROJECT IMAGE
    // ===============================
    @PostMapping("/{id}/image")
    public Project uploadProjectImage(
            @PathVariable Long id,
            @RequestParam("image") MultipartFile image
    ) throws IOException {

        return projectService.uploadImage(id, image);
    }
}