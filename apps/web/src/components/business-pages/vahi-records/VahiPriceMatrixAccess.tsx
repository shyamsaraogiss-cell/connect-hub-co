'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { useAuth } from '@/components/auth/AuthProvider';
import styles from './VahiApprovedContent.module.css';

type Matrix = {
  heading: string;
  preface: readonly string[];
  columns: readonly string[];
  rows: readonly (readonly string[])[];
  notes: readonly string[];
};

const EXCLUSIONS_NOTICE = "Exclusions: The standard service tier covers coordination and lookup only. It strictly excludes physical travel, personal guest accommodation, traditional third-party ritual offerings, custodian-specific administrative charges, courier logistics, or optional premium delivery methods unless explicitly stated in the invoice / paid receipt.";

const DEFAULT_PRICE_MATRIX: Matrix = {
  heading: "Price (All prices are in Indian Rupees – INR)",
  preface: [
    "Service Pricing Structure & Tiers",
    "Price search requests are tracked only after obtaining the customer’s information and issuing a unique Enquiry ID. Upon Admin approval, the customer receives a password.",
    "Pricing is determined transparently in Indian Rupees (INR) based on the target historical era and depth of generations requested:",
  ],
  columns: ["Year From", "Year Up To", "2nd Gen", "3rd Gen", "4th Gen", "5th Gen"],
  rows: [
    ["2010", "Up to date", "11,999/-", "15,999/-", "21,999/-", "51,999/-"],
    ["2000", "2009", "17,999/-", "21,999/-", "25,999/-", "51,999/-"],
    ["1980", "1999", "25,999/-", "29,999/-", "36,999/-", "61,999/-"],
    ["1975", "1979", "N/A", "N/A", "61,999/-", "66,999/-"],
    ["1950", "1974", "N/A", "N/A", "70,999/-", "74,999/-"],
    ["1940", "1949", "N/A", "N/A", "75,999/-", "81,999/-"],
    ["1920", "1939", "N/A", "N/A", "91,999/-", "99,999/-"],
  ],
  notes: [
    EXCLUSIONS_NOTICE,
  ],
};

/**
 * TEMPORARY FOUNDER REVIEW MODE:
 * The Price Matrix is displayed openly below for Founder visual review.
 * IMPORTANT: This open display is temporary and MUST NOT be used in production.
 * In production, server-side access control requiring Enquiry ID + Admin password
 * via /vahi/price-matrix/unlock must be enforced.
 */
export function VahiPriceMatrixAccess() {
  const { user } = useAuth();
  const [matrix, setMatrix] = useState<Matrix>(DEFAULT_PRICE_MATRIX);

  useEffect(() => {
    if ((user?.role as string) !== 'FOUNDER' && (user?.role as string) !== 'ADMIN') return;
    void api<{ matrix: Matrix }>('/vahi/price-matrix/internal')
      .then((response) => setMatrix(response.matrix))
      .catch(() => {});
  }, [user]);

  const displayMatrix = matrix || DEFAULT_PRICE_MATRIX;

  return (
    <section className={styles.priceSection} id="price-matrix" aria-labelledby="price-title">
      <header>
        <p>PROTECTED PRICE MATRIX</p>
        <h2 id="price-title">PROTECTED PRICE MATRIX (INR)</h2>
      </header>

      <div className={styles.matrixWrap}>
        <div className={styles.priceNotes}>
          {displayMatrix.preface.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <table>
          <thead>
            <tr>
              {displayMatrix.columns.map((column) => (
                <th scope="col" key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayMatrix.rows.map((row) => (
              <tr key={`${row[0]}-${row[1]}`}>
                {row.map((cell, index) =>
                  index === 0 ? <th scope="row" key={cell}>{cell}</th> : <td key={`${index}-${cell}`}>{cell}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.exclusionsNotice}>{EXCLUSIONS_NOTICE}</div>
      </div>
    </section>
  );
}
