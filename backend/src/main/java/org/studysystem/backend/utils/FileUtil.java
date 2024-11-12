package org.studysystem.backend.utils;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Instant;

@Component
public class FileUtil {

    private final String uploadDir = "/uploads/";

    public String saveFile(MultipartFile file) {
        if (file.isEmpty()) return null;

        String originalFileName = file.getOriginalFilename();
        if (originalFileName == null) return null;

        String fileExtension = originalFileName.substring(originalFileName.lastIndexOf('.'));
        String baseName = originalFileName.substring(0, originalFileName.lastIndexOf('.'));
        String fileName = baseName + "_" + Instant.now().toEpochMilli() + fileExtension;
        String filePath = uploadDir + fileName;

        saveFileToDisk(file, filePath);
        return filePath;
    }

    public void deleteFile(String filePath) {
        try {
            Path path = Paths.get(filePath);
            Files.deleteIfExists(path);
        } catch (IOException e) {
            throw new RuntimeException("Failed to delete file: " + filePath, e);
        }
    }

    private void saveFileToDisk(MultipartFile file, String filePath) {
        try {
            Path path = Paths.get(filePath);
            Files.createDirectories(path.getParent());
            Files.write(path, file.getBytes());
        } catch (IOException e) {
            throw new RuntimeException("Error saving file", e);
        }
    }

}
