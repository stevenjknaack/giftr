import React, { ReactNode } from 'react';
import { Modal, ViewStyle, View, Button, StyleSheet } from 'react-native';

type StyledModalProps = {
  visible: boolean;
  closeModal: () => void;
  children?: ReactNode;
  modalStyle?: ViewStyle;
  backgroundStyle?: ViewStyle;
  foregroundStyle?: ViewStyle;
};

const StyledModal: React.FC<StyledModalProps> = ({
  visible,
  closeModal,
  children,
  modalStyle,
  backgroundStyle,
  foregroundStyle,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={closeModal}
      style={[styles.modal, modalStyle]}
    >
      <View style={[styles.background, backgroundStyle]}>
        <View style={[styles.foreground, foregroundStyle]}>
          {children}
          <Button title="close" onPress={closeModal} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {},
  background: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  foreground: { backgroundColor: '#fff', padding: 60 },
});

export default StyledModal;
