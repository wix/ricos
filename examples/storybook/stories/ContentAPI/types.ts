interface EditPanelProps<T> {
  onClick: (args: T) => void;
}

type EditTextProps = EditPanelProps<{
  text?: string;
  alignment?: string;
}>;
