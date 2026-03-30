package com.cww.invoice.common.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LeaveEmailService {


        private final JavaMailSender mailSender;

        public void sendLeaveStatusEmail(String toEmail, String employeeName, String status, String reason) {
            try {
                SimpleMailMessage message = new SimpleMailMessage();
                message.setTo(toEmail);
                message.setSubject("Leave Request " + status);

                String body = "Dear " + employeeName + ",\n\n" +
                        "Your leave request has been " + status + ".\n\n" +
                        (status.equalsIgnoreCase("Rejected") ? "Reason: " + reason + "\n\n" : "") +
                        "Thank you,\nHR Team";

                message.setText(body);

                mailSender.send(message);

            } catch (Exception e) {
                e.printStackTrace();
            }
        }

}
