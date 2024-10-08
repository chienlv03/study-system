package org.studysystem.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class FileStorageService {

    private final String uploadDir = "/uploads/files/";

    public String storeFile(MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new IOException("Failed to store empty file.");
        }

        // Tạo tên file duy nhất
        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();

        // Tạo đường dẫn lưu file
        Path destinationPath = Paths.get(uploadDir).toAbsolutePath().normalize().resolve(fileName);

        // Tạo thư mục nếu chưa có
        Files.createDirectories(destinationPath.getParent());

        // Lưu file vào hệ thống
        Files.copy(file.getInputStream(), destinationPath, StandardCopyOption.REPLACE_EXISTING);

        // Trả về URL của file (cần tùy chỉnh domain thực tế)
        return "/uploads/files/" + fileName;
    }
}
