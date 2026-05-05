import React, { isValidElement, ReactNode } from "react";
import { View, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
  <View className="px-4" style={style}>
    {children}
  </View>
);

const LayoutContent: React.FC<LayoutContentProps> = ({ children, style }) => (
  <View className="flex-1 px-4" style={style}>
    {children}
  </View>
);

const LayoutFooter: React.FC<LayoutFooterProps> = ({ children, style }) => (
  <View className="px-4 py-3 bg-white border-t border-gray-200" style={style}>
    {children}
  </View>
);

LayoutHeader.displayName = "Index.Header";
LayoutContent.displayName = "Index.Content";
LayoutFooter.displayName = "Index.Footer";

// ========== 类型守卫 ==========
const isHeader = (
  child: ReactNode,
): child is React.ReactElement<LayoutHeaderProps> => {
  return isValidElement(child) && child.type === LayoutHeader;
};

const isContent = (
  child: ReactNode,
): child is React.ReactElement<LayoutContentProps> => {
  return isValidElement(child) && child.type === LayoutContent;
};

const isFooter = (
  child: ReactNode,
): child is React.ReactElement<LayoutFooterProps> => {
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
  const mainContent = contentContent || otherChildren;

  return (
    <SafeAreaView
      className="flex-1 bg-screenBackground"
      style={style}
      edges={["top"]}
    >
      <View className="flex-1">
        {/* 可选的 Header 区域 */}
        {headerContent && (
          <View className="flex-shrink-0">{headerContent}</View>
        )}

        {/* 主要内容区域 */}
        <View className="flex-1">{mainContent}</View>

        {/* 可选的 Footer 区域 */}
        {footerContent && (
          <View className="flex-shrink-0">{footerContent}</View>
        )}
      </View>
    </SafeAreaView>
  );
};

// ========== 静态属性挂载 ==========
LayoutComponent.Header = LayoutHeader;
LayoutComponent.Content = LayoutContent;
LayoutComponent.Footer = LayoutFooter;

// 样式已迁移到nativeWind类名

export { LayoutComponent };
