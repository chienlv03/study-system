package org.studysystem.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class FileResponse {
    private String fileName;
    private String fileData;
}
