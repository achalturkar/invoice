package com.cww.invoice.bankDetails.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BankDetailsRequestDto {
    private String bankName;
    private String bankBranch;
    private String bankAccountNo;
    private String bankIfsc;
    private String bankAccountName;
    private String swiftCode;
    private String panNo;
    private String tanNo;
    private String udyamRegNo;
}

