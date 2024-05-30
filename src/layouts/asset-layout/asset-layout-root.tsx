import styles from "./asset-layout.module.css";

type AssetLayoutRootProps = {
  children: React.ReactNode;
};

export function AssetLayoutRoot({ children }: AssetLayoutRootProps) {
  return <main className={styles.main}>{children}</main>;
}
