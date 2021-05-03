interface EditPanelProps<T> {
  onAdd: (args: T) => void;
}

type EditTextProps = EditPanelProps<{
  text?: string;
  alignment?: string;
}>;
