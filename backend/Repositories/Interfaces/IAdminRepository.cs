using backend.Models;

namespace backend.Repositories.Interfaces
{
    public interface IAdminRepository
    {
        Admin? GetAdminById(int adminId);
    }
}
