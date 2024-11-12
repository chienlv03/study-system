package org.studysystem.backend.service;

import org.studysystem.backend.dto.response.FileResponse;

import java.io.IOException;
import java.util.List;

public interface SubmissionFileService {
    List<FileResponse> getFilesByAssignment(Long submissionId) throws IOException;
}
