package com.cww.invoice.common.util;
public class AmountToWords {

    private static final String[] units = {
            "", "One", "Two", "Three", "Four", "Five",
            "Six", "Seven", "Eight", "Nine", "Ten",
            "Eleven", "Twelve", "Thirteen", "Fourteen",
            "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"
    };

    private static final String[] tens = {
            "", "", "Twenty", "Thirty", "Forty", "Fifty",
            "Sixty", "Seventy", "Eighty", "Ninety"
    };

    /* ===============================
       PUBLIC METHOD FOR DECIMAL VALUE
    ================================ */
    public static String convert(double amount) {

        if (amount == 0) {
            return "Zero Rupees Only";
        }

        long rupees = (long) amount;
        int paise = (int) Math.round((amount - rupees) * 100);

        StringBuilder result = new StringBuilder();

        if (rupees > 0) {
            result.append(convertNumber(rupees)).append(" Rupees");
        }

        if (paise > 0) {
            if (rupees > 0) {
                result.append(" and ");
            }
            result.append(convertNumber(paise)).append(" Paise");
        }

        result.append(" Only");

        return result.toString().replaceAll("\\s+", " ").trim();
    }

    /* ===============================
       INTERNAL NUMBER CONVERSION
    ================================ */
    private static String convertNumber(long number) {

        if (number == 0) return "";

        if (number < 20)
            return units[(int) number];

        if (number < 100)
            return tens[(int) number / 10] + " " + units[(int) number % 10];

        if (number < 1000)
            return units[(int) number / 100] + " Hundred " +
                    convertNumber(number % 100);

        if (number < 100000)
            return convertNumber(number / 1000) + " Thousand " +
                    convertNumber(number % 1000);

        if (number < 10000000)
            return convertNumber(number / 100000) + " Lakh " +
                    convertNumber(number % 100000);

        return convertNumber(number / 10000000) + " Crore " +
                convertNumber(number % 10000000);
    }
}
