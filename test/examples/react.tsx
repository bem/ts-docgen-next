import { RefObject, ChangeEventHandler, ReactNode, ReactElement } from "react";

export type IconProvider = (className: string) => ReactElement<any>;

interface Props {
  test: RefObject<HTMLInputElement>;
  /**
   * Обработчик, вызываемый при смене файла
   */
  onChange?: ChangeEventHandler<HTMLInputElement>;
  /**
   * Дополнительный контент после `children`
   */
  addonAfter?: ReactNode;
  /**
   * Иконка на кнопке
   */
  icon?: IconProvider;
  /**
   * Контент иконки
   */
  children?: ReactElement;
}

export default function Props(_props: Props) {
  return null;
}
