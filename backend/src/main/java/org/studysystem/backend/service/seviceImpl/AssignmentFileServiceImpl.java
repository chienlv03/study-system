package org.studysystem.backend.service.seviceImpl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.studysystem.backend.dto.response.FileResponse;
import org.studysystem.backend.entity.AssignmentFile;
import org.studysystem.backend.repository.AssignmentFileRepository;
import org.studysystem.backend.service.AssignmentFileService;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AssignmentFileServiceImpl implements AssignmentFileService {
    private final AssignmentFileRepository assignmentFileRepository;

    @Override
    public List<FileResponse> getFilesByAssignment(Long assignmentId) throws IOException {
        List<AssignmentFile> files = assignmentFileRepository.findByAssignmentId(assignmentId);
        List<FileResponse> fileResponseList = new ArrayList<>();

        for (AssignmentFile file : files) {
            File physicalFile = new File(file.getFilePath());
            byte[] fileData = Files.readAllBytes(physicalFile.toPath());
            String base64Data = Base64.getEncoder().encodeToString(fileData);

            // Thêm vào danh sách response
            fileResponseList.add(new FileResponse(file.getFileName(), base64Data));
        }

        return fileResponseList;
    }
}
