import React, { isValidElement, ReactNode } from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/constants/theme";

// ========== 类型定义 ==========
interface LayoutHeaderProps {
  children: ReactNode;
  style?: ViewStyle;
}

interface LayoutContentProps {
  children: ReactNode;
  style?: ViewStyle;
}

interface LayoutFooterProps {
  children: ReactNode;
  style?: ViewStyle;
}

interface LayoutComponentProps {
  children: ReactNode;
  style?: ViewStyle;
}

// ========== 子组件定义（作为标识） ==========
const LayoutHeader: React.FC<LayoutHeaderProps> = ({ children, style }) => (
  <View style={ [styles.slotHeader, style] }>{ children }</View>
);

const LayoutContent: React.FC<LayoutContentProps> = ({ children, style }) => (
  <View style={ [styles.slotContent, style] }>{ children }</View>
);

const LayoutFooter: React.FC<LayoutFooterProps> = ({ children, style }) => (
  <View style={ [styles.slotFooter, style] }>{ children }</View>
);

LayoutHeader.displayName = 'Index.Header';
LayoutContent.displayName = 'Index.Content';
LayoutFooter.displayName = 'Index.Footer';

// ========== 类型守卫 ==========
const isHeader = (child: ReactNode): child is React.ReactElement<LayoutHeaderProps> => {
  return isValidElement(child) && child.type === LayoutHeader;
};

const isContent = (child: ReactNode): child is React.ReactElement<LayoutContentProps> => {
  return isValidElement(child) && child.type === LayoutContent;
};

const isFooter = (child: ReactNode): child is React.ReactElement<LayoutFooterProps> => {
  return isValidElement(child) && child.type === LayoutFooter;
};

// ========== 主组件 ==========
const LayoutComponent: React.FC<LayoutComponentProps> & {
  Header: typeof LayoutHeader;
  Content: typeof LayoutContent;
  Footer: typeof LayoutFooter;
} = ({ children, style }) => {
  let headerContent: ReactNode = null;
  let contentContent: ReactNode = null;
  let footerContent: ReactNode = null;
  let otherChildren: ReactNode[] = [];

  // 遍历 children，分离 Header、Content、Footer 和其他内容
  React.Children.forEach(children, (child) => {
    if (isHeader(child)) {
      headerContent = child;
    } else if (isContent(child)) {
      contentContent = child;
    } else if (isFooter(child)) {
      footerContent = child;
    } else {
      otherChildren.push(child);
    }
  });

  // 决定主要内容区域显示什么
  // 优先级：Content > otherChildren
  const mainContent = contentContent !== null ? contentContent : otherChildren;

  return (
    <SafeAreaView style={ [styles.container, style] } edges={ ["top"] }>
      <View style={ { flex: 1 } }>
        {/* 可选的 Header 区域 */ }
        { headerContent && (
          <View style={ styles.headerWrapper }>
            { headerContent }
          </View>
        ) }

        {/* 主要内容区域 */ }
        <View style={ styles.contentWrapper }>
          { mainContent }
        </View>

        {/* 可选的 Footer 区域 */ }
        { footerContent && (
          <View style={ styles.footerWrapper }>
            { footerContent }
          </View>
        ) }
      </View>
    </SafeAreaView>
  );
};

// ========== 静态属性挂载 ==========
LayoutComponent.Header = LayoutHeader;
LayoutComponent.Content = LayoutContent;
LayoutComponent.Footer = LayoutFooter;

// ========== 样式 ==========
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.screenBackground,
  },
  headerWrapper: {
    flexShrink: 0,
  },
  contentWrapper: {
    flex: 1,
  },
  footerWrapper: {
    flexShrink: 0,
  },
  slotHeader: {
    paddingHorizontal: 16,
  },
  slotContent: {
    flex: 1,
    paddingHorizontal: 16,
  },
  slotFooter: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
  },
});

export { LayoutComponent };