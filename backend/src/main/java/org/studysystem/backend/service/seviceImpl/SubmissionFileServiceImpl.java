package org.studysystem.backend.service.seviceImpl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.studysystem.backend.dto.response.FileResponse;
import org.studysystem.backend.entity.SubmissionFile;
import org.studysystem.backend.repository.SubmissionFileRepository;
import org.studysystem.backend.service.SubmissionFileService;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SubmissionFileServiceImpl implements SubmissionFileService {
    private final SubmissionFileRepository submissionFileRepository;

    @Override
    public List<FileResponse> getFilesByAssignment(Long submissionId) throws IOException {
        List<SubmissionFile> files = submissionFileRepository.findBySubmissionId(submissionId);
        List<FileResponse> fileResponseList = new ArrayList<>();

        for (SubmissionFile file : files) {
            File physicalFile = new File(file.getFilePath());
            byte[] fileData = Files.readAllBytes(physicalFile.toPath());
            String base64Data = Base64.getEncoder().encodeToString(fileData);

            // Thêm vào danh sách response
            fileResponseList.add(new FileResponse(file.getFileName(), base64Data));
        }

        return fileResponseList;
    }
}
