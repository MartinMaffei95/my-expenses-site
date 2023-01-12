import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { MouseEvent, useEffect, useMemo, useState } from 'react';
import {
  MdDeleteOutline,
  MdLibraryAdd,
  MdModeEditOutline,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md';
import { useSelector } from 'react-redux';
import { CategoryLi } from '../../components/Category/Pure/CategoryLi';
import { CustomIcon } from '../../components/SelectIcon/Molecule/CustomIcon';
import { useModal } from '../../hooks/useModal';
import { useReloadData } from '../../hooks/useReloadData';
import { Category } from '../../Interfaces/Category.interface';
import { ReduxState, UserState } from '../../Interfaces/Redux.interface';
import { deleteCategory } from '../../services/Category.services';

const Categories = () => {
  const [appCategories, setAppCategories] = useState<Category[]>([]);
  const [userCategories, setUserCategories] = useState<Category[]>([]);
  const categories = useSelector(
    (state: ReduxState) => state.user.user.my_categories
  );
  const user_id = JSON.parse(localStorage.getItem('user_id') as string);

  const asignCategories = (
    categories: Category[]
  ): { sysCat: Category[]; userCat: Category[] } => {
    if (!categories) return { sysCat: [], userCat: [] };
    let sysCat = [];
    let userCat = [];
    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      if (category.public === true) {
        if (!category.isSubCategory) sysCat.push(category);
      } else {
        if (!category.isSubCategory) userCat.push(category);
      }
    }

    return { sysCat, userCat };
  };

  useEffect(() => {
    const { sysCat, userCat } = asignCategories(categories);
    setAppCategories(sysCat);
    setUserCategories(userCat);
  }, [categories]);
  const { handleModal } = useModal();
  return (
    <div className="p-2  mb-6">
      <h3 className="subtitle mt-0">Categorias</h3>
      <List>
        <p className="subtitle">Categorias predefinidas</p>
        {appCategories.map((cat) => (
          <CategoryLi key={cat._id} category={cat} />
        ))}
      </List>
      <div>
        <div className="flex justify-center items-center gap-2">
          <p className="subtitle">Mis categorias</p>{' '}
          <button
            className="text-xl"
            onClick={() => handleModal(true, 'CREATE_CATEGORY')}
          >
            <MdLibraryAdd />
          </button>
        </div>
        {userCategories && userCategories.length > 0 ? (
          userCategories.map((cat) => (
            <CategoryLi
              key={cat._id}
              category={cat}
              fromUser={cat.created_by === user_id}
            />
          ))
        ) : (
          <div>
            <p>No hay nada</p>
            <span>
              Crear categoria{' '}
              <button
                className="text-xl"
                onClick={() => handleModal(true, 'CREATE_CATEGORY')}
              >
                <MdLibraryAdd />
              </button>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
export default Categories;
