using backend.DTOs;
using System.Net.Http.Headers;
using System.Text.Json;

namespace backend.Helper
{
    public class HelperClass
    {
        private const string UploadUrl = "https://imageupload-s259.onrender.com/api/upload-image";
        public async Task<string?> UploadImageAsync(IFormFile file)
        {
            if (file == null || file.Length == 0)
                throw new ArgumentException("File cannot be null or empty");

            using (var httpClient = new HttpClient())
            using (var content = new MultipartFormDataContent())
            using (var stream = file.OpenReadStream())
            {
                var fileContent = new StreamContent(stream);
                fileContent.Headers.ContentType = new MediaTypeHeaderValue(file.ContentType);
                content.Add(fileContent, "file", file.FileName);

                try
                {
                    var response = await httpClient.PostAsync(UploadUrl, content);

                    if (response.IsSuccessStatusCode)
                    {
                        var responseString = await response.Content.ReadAsStringAsync();
                        ApiResponse jsonResponse = JsonSerializer.Deserialize<ApiResponse>(responseString);
                        return jsonResponse?.ImageUrl;
                    }
                    else
                    {
                        return null;
                    }
                }
                catch (Exception)
                {
                    return null;
                }
            }
        }

    }
}
