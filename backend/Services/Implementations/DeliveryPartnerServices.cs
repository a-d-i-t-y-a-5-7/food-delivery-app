﻿using backend.DTOs;
using backend.Models;
using backend.Repositories.Implementations;
using backend.Repositories.Interfaces;
using backend.Services.Interfaces;

namespace backend.Services.Implementations
{
    public class DeliveryPartnerServices : IDeliveryPartnerServices
    {
        private readonly IDeliveryPartnerRepository _deliveryPartnerRepo;

        public DeliveryPartnerServices(IDeliveryPartnerRepository deliveryPartnerRepo)
        {
            _deliveryPartnerRepo = deliveryPartnerRepo;
        }

        public bool AddDeliveryPartner(User deliveryPartner)
        {
            bool result = _deliveryPartnerRepo.AddDeliveryPartner(deliveryPartner);
            return result;
        }

        public DeliveryPartnerOrderDetailsDto? GetOrdersByDeliveryPartner(int deliveryPartnerId)
        {
            var deliveryPartner = _deliveryPartnerRepo.GetDeliveryPartnerWithOrders(deliveryPartnerId);

            if (deliveryPartner == null) return null;

            var dto = new DeliveryPartnerOrderDetailsDto
            {
                DeliveryPartnerId = deliveryPartner.Id,
                Orders = deliveryPartner.Orders.Select(order => new DeliveryPartnerOrderDetailsDto.OrderDetail
                {
                    OrderId = order.Id,
                    TotalAmount = order.TotalAmount,
                    Status = order.Status,
                    CreatedAt = order.CreatedAt ?? DateTime.MinValue,
                    PickedAt = order.PickedAt,
                    DeliveredAt = order.DeliveredAt,
                    RestaurantName = order.Restaurant?.Name ?? "N/A",
                    RestaurantNumber = order.Restaurant?.PhoneNumber,
                    CustomerName = order.Customer.Name,
                    CustomerNumber = order.Customer.PhoneNumber,
                    DeliveryIncentive = order.DeliveryRequests.FirstOrDefault()?.DeliveryInsentive
                }).ToList()
            };

            return dto;
        }
    }
}
