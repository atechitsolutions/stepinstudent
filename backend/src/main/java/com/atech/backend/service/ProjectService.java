package com.atech.backend.service;

import com.atech.backend.entity.Project;
import com.atech.backend.repository.ProjectRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    // ===============================
    // GET ALL PROJECTS
    // ===============================
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    // ===============================
    // GET PROJECT BY ID
    // ===============================
    public Project getProject(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Project not found"));
    }

    // ===============================
    // CREATE PROJECT
    // ===============================
    public Project createProject(Project project) {
        return projectRepository.save(project);
    }

    // ===============================
    // UPDATE PROJECT
    // ===============================
    public Project updateProject(
            Long id,
            Project updatedProject
    ) {

        Project project = getProject(id);

        project.setTitle(updatedProject.getTitle());
        project.setCategory(updatedProject.getCategory());
        project.setDescription(updatedProject.getDescription());
        project.setImageUrl(updatedProject.getImageUrl());
        project.setProjectUrl(updatedProject.getProjectUrl());
        project.setTechnologies(
                updatedProject.getTechnologies()
        );

        return projectRepository.save(project);
    }

    // ===============================
    // DELETE PROJECT
    // ===============================
    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }

    // ===============================
    // UPLOAD PROJECT IMAGE
    // ===============================
    public Project uploadImage(
            Long id,
            MultipartFile image
    ) throws IOException {

        if (image == null || image.isEmpty()) {
            throw new IllegalArgumentException(
                    "Image is required"
            );
        }

        String originalFilename =
                image.getOriginalFilename();

        String extension = "";

        if (originalFilename != null
                && originalFilename.contains(".")) {

            extension = originalFilename.substring(
                    originalFilename.lastIndexOf(".")
            );
        }

        // Generate unique filename
        String filename =
                UUID.randomUUID() + extension;

        // Create uploads/projects directory
        Path uploadDirectory =
                Paths.get("uploads/projects");

        Files.createDirectories(uploadDirectory);

        // Final file path
        Path filePath =
                uploadDirectory.resolve(filename);

        // Save image
        Files.write(
                filePath,
                image.getBytes()
        );

        // Find project
        Project project = getProject(id);

        // Save image URL in MySQL
        project.setImageUrl(
                "/uploads/projects/" + filename
        );

        return projectRepository.save(project);
    }
}