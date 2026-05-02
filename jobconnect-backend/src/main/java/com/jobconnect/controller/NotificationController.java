package com.jobconnect.controller;

import com.jobconnect.entity.common.Notification;
import com.jobconnect.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasRole('CANDIDATE') or hasRole('RECRUITER') or hasRole('ADMIN')")
    public ResponseEntity<Page<Notification>> getNotifications(@PathVariable Long userId, Pageable pageable) {
        return ResponseEntity.ok(notificationService.getNotificationsByUser(userId, pageable));
    }

    @GetMapping("/user/{userId}/unread")
    @PreAuthorize("hasRole('CANDIDATE') or hasRole('RECRUITER') or hasRole('ADMIN')")
    public ResponseEntity<Page<Notification>> getUnreadNotifications(@PathVariable Long userId, Pageable pageable) {
        return ResponseEntity.ok(notificationService.getUnreadNotifications(userId, pageable));
    }

    @GetMapping("/user/{userId}/unread-count")
    @PreAuthorize("hasRole('CANDIDATE') or hasRole('RECRUITER') or hasRole('ADMIN')")
    public ResponseEntity<Long> getUnreadCount(@PathVariable Long userId) {
        return ResponseEntity.ok(notificationService.getUnreadCount(userId));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('RECRUITER')")
    public ResponseEntity<Notification> createNotification(
            @RequestParam Long userId,
            @RequestParam String type,
            @RequestParam String title,
            @RequestParam String message,
            @RequestParam(required = false) Long relatedEntityId,
            @RequestParam(required = false) String relatedEntityType) {
        return ResponseEntity.status(HttpStatus.CREATED).body(
                notificationService.createNotification(userId, type, title, message, relatedEntityId, relatedEntityType)
        );
    }

    @PatchMapping("/{notificationId}/read")
    @PreAuthorize("hasRole('CANDIDATE') or hasRole('RECRUITER') or hasRole('ADMIN')")
    public ResponseEntity<Notification> markAsRead(@PathVariable Long notificationId) {
        return ResponseEntity.ok(notificationService.markAsRead(notificationId));
    }

    @PatchMapping("/user/{userId}/read-all")
    @PreAuthorize("hasRole('CANDIDATE') or hasRole('RECRUITER') or hasRole('ADMIN')")
    public ResponseEntity<Void> markAllAsRead(@PathVariable Long userId) {
        notificationService.markAllAsRead(userId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{notificationId}")
    @PreAuthorize("hasRole('CANDIDATE') or hasRole('RECRUITER') or hasRole('ADMIN')")
    public ResponseEntity<Void> deleteNotification(@PathVariable Long notificationId) {
        notificationService.deleteNotification(notificationId);
        return ResponseEntity.noContent().build();
    }
}
