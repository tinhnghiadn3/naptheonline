using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Drive.v3;
using Google.Apis.Services;
using Google.Apis.Util.Store;
using NapTheOnline.Models;

namespace NapTheOnline.Services
{
    public class GoogleDriveAPI
    {
        private string[] Scopes = { DriveService.Scope.Drive };
        private string ApplicationName = "NapTheOnline247";
        private string FolderId = "1e5VcbS7C41vB12nmK4Vd2MWm_OKMVu-G";

        public void RestoreFile()
        {
            var service = GetDriveServiceInstance();
            string savePath = "Uploads/Images";
            var googleDriveAPIs = GetDriveFiles();
            foreach (var file in googleDriveAPIs.Where(x => x.Id != FolderId))
            {
                var request = service.Files.Get(file.Id);
                using (var stream = new FileStream(savePath, FileMode.OpenOrCreate))
                {
                    request.Download(stream);
                }
            }
        }

        public void BackupFile()
        {
            var service = GetDriveServiceInstance();
            var googleDriveAPIs = GetDriveFiles();
            foreach (var file in googleDriveAPIs.Where(x => x.Id != FolderId))
            {
                DeleteFile(file.Id);
            }
            
            foreach(var file in Directory.GetFiles("Uploads/Images"))
            {
                var fileMetadata = new Google.Apis.Drive.v3.Data.File();
                FilesResource.CreateMediaUpload request;
                using (var stream = new FileStream(file, FileMode.Open))
                {
                    fileMetadata.Name = Path.GetFileName(stream.Name);
                    fileMetadata.MimeType = "image/jpeg";
                    fileMetadata.Parents = new List<string> { FolderId };
                    request = service.Files.Create(fileMetadata, stream, "image/jpeg");
                    request.Upload();
                }
            }
        }

        public void DeleteFile(string fileId)
        {
            var service = GetDriveServiceInstance();
            FilesResource.DeleteRequest request;
            request = service.Files.Delete(fileId);
            request.Execute();
        }

        private DriveService GetDriveServiceInstance()
        {
            UserCredential credential;

            using (var stream = new FileStream("credentials.json", FileMode.Open, FileAccess.Read))
            {
                string credPath = Environment.GetFolderPath(Environment.SpecialFolder.Personal);

                credPath = Path.Combine(credPath, "./credentials.json");

                credential = GoogleWebAuthorizationBroker.AuthorizeAsync(
                    GoogleClientSecrets.Load(stream).Secrets,
                    Scopes,
                    "user",
                    CancellationToken.None,
                    new FileDataStore(credPath, true)).Result;
            }

            var service = new DriveService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = credential,
                ApplicationName = ApplicationName,
            });

            return service;
        }

        public List<GoogleDriveFile> GetDriveFiles()
        {
            DriveService service = GetDriveServiceInstance();
            FilesResource.ListRequest FileListRequest = service.Files.List();
            FileListRequest.Fields = "nextPageToken, files(createdTime, id, name, size, version, trashed, parents)";

            // List files.
            IList<Google.Apis.Drive.v3.Data.File> files = FileListRequest.Execute().Files;
            List<GoogleDriveFile> FileList = new List<GoogleDriveFile>();

            if (files != null && files.Count > 0)
            {
                foreach (var file in files)
                {
                    GoogleDriveFile File = new GoogleDriveFile
                    {
                        Id = file.Id,
                        Name = file.Name,
                        Size = file.Size,
                        Version = file.Version,
                        CreatedTime = file.CreatedTime,
                        Parents = file.Parents
                    };
                    FileList.Add(File);
                }
            }
            return FileList;
        }
    }
}
