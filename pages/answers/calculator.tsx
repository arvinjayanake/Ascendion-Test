import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';

export default function CalculatorScreen() {
  const [firstNumber, setFirstNumber] = useState<string>('');
  const [secondNumber, setSecondNumber] = useState<string>('');
  const [total, setTotal] = useState<string | null>(null);

  function sanitizeInput(input: string): string {
    const cleaned = input.replace(/[^0-9.]/g, '');
    const dotIndex = cleaned.indexOf('.');

    if (dotIndex === -1) return cleaned;
    const beforeDot = cleaned.slice(0, dotIndex);
    const afterDot = cleaned
      .slice(dotIndex + 1)
      .replace(/\./g, '');
    return `${beforeDot}.${afterDot}`;
  }


  function formatWithCommas(value: string): string {
    const [intPart, fracPart] = value.split('.');
    const formattedInt = intPart.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ','
    );
    return fracPart !== undefined
      ? `${formattedInt}.${fracPart}`
      : formattedInt;
  }

  function onFirstNumberChange(text: string) {
    const clean = sanitizeInput(text);
    setFirstNumber(clean ? formatWithCommas(clean) : '');
  }

  function onSecondNumberChange(text: string) {
    const clean = sanitizeInput(text);
    setSecondNumber(clean ? formatWithCommas(clean) : '');
  }

  function calculateSum() {
    const a = parseFloat(firstNumber.replace(/,/g, '')) || 0;
    const b = parseFloat(secondNumber.replace(/,/g, '')) || 0;
    const result = a + b;
    // format result with locale commas
    setTotal(result.toLocaleString());
  }

  function clearAll() {
    setFirstNumber('');
    setSecondNumber('');
    setTotal(null);
  }

  const isAddDisabled =
    firstNumber.trim() === '' || secondNumber.trim() === '';

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>Add Two Numbers - Arvin</Text>
      </View>

      {/* Calculator Form */}
      <View style={styles.formCard}>
        <Text style={styles.label}>First Number</Text>
        <TextInput
          style={styles.input}
          placeholder="First Number"
          keyboardType={
            Platform.OS === 'web' ? 'default' : 'decimal-pad'
          }
          value={firstNumber}
          onChangeText={onFirstNumberChange}
        />

        <Text style={[styles.label, styles.spacedLabel]}>
          Second Number
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Second Number"
          keyboardType={
            Platform.OS === 'web' ? 'default' : 'decimal-pad'
          }
          value={secondNumber}
          onChangeText={onSecondNumberChange}
        />

        {/* Actions */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={
              isAddDisabled ? styles.buttonDisabled : styles.button
            }
            onPress={calculateSum}
            disabled={isAddDisabled}
          >
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.clearButton]}
            onPress={clearAll}
          >
            <Text style={[styles.buttonText, styles.clearText]}>
              Clear
            </Text>
          </TouchableOpacity>
        </View>

        {/* Result */}
        {total !== null && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>Total</Text>
            <Text style={styles.resultValue}>{total}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F6FC',
  },
  topBar: {
    height: 120,
    backgroundColor: '#4267B2',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxWidth: '100%',
    alignSelf: 'center',
  },
  topBarTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  formCard: {
    backgroundColor: '#fff',
    marginTop: 16,
    borderRadius: 8,
    padding: 24,
    width: '90%',
    maxWidth: 400,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 4,
  },
  label: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  spacedLabel: {
    marginTop: 16,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    marginTop: 8,
    backgroundColor: '#FFF',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  button: {
    flex: 1,
    backgroundColor: '#4267B2',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  buttonDisabled: {
    flex: 1,
    backgroundColor: '#A0A0A0',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  clearButton: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#4267B2',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  clearText: {
    color: '#4267B2',
  },
  resultContainer: {
    marginTop: 32,
    alignItems: 'center',
  },
  resultLabel: {
    fontSize: 16,
    color: '#777',
  },
  resultValue: {
    fontSize: 36,
    fontWeight: '700',
    color: '#000',
    marginTop: 4,
  },
});
