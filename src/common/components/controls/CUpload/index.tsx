import { useRef, useState } from "react";

import { Close, Visibility } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import classNames from "classnames";

import uploadImgSrc from "@/assets/images/upload.png";
import { generateKey, getExtension } from "@/funcs";
import { IUploadedFile } from "@/types/upload";

import "./styles.scss";

export const CUpload = ({
  multiple = false,
  error = false,
}: {
  multiple?: boolean;
  error?: boolean;
}) => {
  //#region Data
  const inputRef = useRef<HTMLInputElement>(null);
  const dropzoneRef = useRef<HTMLDivElement>(null);

  const [files, setFiles] = useState<IUploadedFile[]>([]);
  //#endregion

  //#region Event
  const onBrowse = () => inputRef.current?.click();

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;

    try {
      if (multiple) {
        const files = selectedFiles ? Array.from(selectedFiles) : [];
        setFiles((prev) => [
          ...prev,
          ...files.map((file) => ({
            id: generateKey(`${file.name}-${file.size}-${file.type}`),
            name: file.name,
            size: file.size,
            type: file.type,
            extension: getExtension(file),
            url: URL.createObjectURL(file),
          })),
        ]);
      } else {
        const file = selectedFiles?.[0];
        if (file)
          setFiles([
            {
              id: generateKey(`${file.name}-${file.size}-${file.type}`),
              name: file.name,
              size: file.size,
              type: file.type,
              extension: getExtension(file),
              url: URL.createObjectURL(file),
            },
          ]);
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      if (inputRef.current) {
        inputRef.current.value = ""; //note: Reset the input value after processing
      }
    }
  };

  const onDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (dropzoneRef.current) {
      dropzoneRef.current.classList.add("drag-enter");
    }
  };

  const onDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (dropzoneRef.current) {
      dropzoneRef.current.classList.remove("drag-enter");
    }
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (dropzoneRef.current) {
      dropzoneRef.current.classList.remove("drag-enter");
    }
    console.log("🚀 ~ onDrop ~ event:", event);
  };

  const onView = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const onRemove =
    (index = -1) =>
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
      event.stopPropagation();
      if (index === -1) setFiles([]);
      else setFiles((prev) => prev.filter((_, i) => i !== index));
    };
  //#endregion

  //#region Render
  return (
    <div className="c-upload--wrapper">
      <div
        ref={dropzoneRef}
        className={classNames("c-upload--dropzone", error && "error")}
        onClick={onBrowse}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        {files.length > 0 && !multiple ? (
          <div className="c-upload--single-preview">
            <div className="c-upload--preview-box">
              <img src={files[0].url} className="c-upload--preview-image" />
              <div className="c-upload--preview-backdrop">
                <div className="c-upload--preview-actions">
                  <IconButton size="small" onClick={onView}>
                    <Visibility fontSize="small" />
                  </IconButton>
                  <IconButton size="small" onClick={onRemove()}>
                    <Close fontSize="small" />
                  </IconButton>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="c-upload--content">
            <img
              src={uploadImgSrc}
              alt="upload-icon"
              className="c-upload--icon"
            />
            <span className="c-upload--title">
              Kéo thả hoặc chọn {multiple ? "files" : "file"}
            </span>
            <span className="c-upload--description">
              Thả {multiple ? "files" : "file"} vào đây hoặc chọn từ thiết bị
              của bạn
            </span>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          hidden
          multiple={multiple}
          onChange={onInputChange}
        />
      </div>
      {files.length > 0 && multiple && (
        <div className="c-upload--multiple-preview">
          {files.map((file, index) => (
            <CFileItem
              key={file.id}
              file={file}
              onView={onView}
              onRemove={onRemove(index)}
              isLastItem={index === files.length - 1}
            />
          ))}
        </div>
      )}
    </div>
  );
  //#endregion
};

export const CFileItem = ({
  file,
  onView,
  onRemove,
  isLastItem,
}: {
  file: IUploadedFile;
  onView: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onRemove: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isLastItem?: boolean;
}) => {
  //#region Data
  const [trigger, setTrigger] = useState(false);
  //#endregion

  //#region Event
  const handleRemove = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (isLastItem) onRemove(event);
    else {
      setTrigger(true);
      setTimeout(() => {
        onRemove(event);
      }, 300); //note: Time at here must be equal or more a bit than animation-duration
    }
  };
  //#endregion

  //#region Render
  return (
    <Tooltip key={file.id} title={file.name} arrow>
      <div
        className={classNames(
          "c-upload--preview-box",
          trigger && "trigger-animation"
        )}
      >
        <img src={file.url} className="c-upload--preview-image" />
        <div className="c-upload--preview-backdrop">
          <div className="c-upload--preview-actions">
            <IconButton size="small" onClick={onView}>
              <Visibility fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={handleRemove}>
              <Close fontSize="small" />
            </IconButton>
          </div>
        </div>
      </div>
    </Tooltip>
  );
  //#endregion
};
