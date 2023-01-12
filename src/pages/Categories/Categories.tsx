import { List } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { MdLibraryAdd } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { CategoryLi } from '../../components/Category/Pure/CategoryLi';
import { useModal } from '../../hooks/useModal';
import { Category } from '../../Interfaces/Category.interface';
import { ReduxState, UserState } from '../../Interfaces/Redux.interface';

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
      <List>
        <p className="subtitle">Categorias predefinidas</p>
        {appCategories.map((cat) => (
          <CategoryLi key={cat._id} category={cat} />
        ))}
      </List>
      <div>
        <div className="flex justify-center items-baseline gap-4">
          <span className="subtitle">Mis categorias</span>{' '}
          {userCategories && userCategories.length > 0 ? (
            <button
              className="text-xl flex justify-center items-center text-neutral-900"
              onClick={() => handleModal(true, 'CREATE_CATEGORY')}
            >
              <MdLibraryAdd />
            </button>
          ) : null}
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
          <div className="flex flex-col items-center justify-center gap-2 mb-2">
            <button
              className="flex items-center justify-center gap-2 mb-2 border-2 rounded p-2"
              onClick={() => handleModal(true, 'CREATE_CATEGORY')}
            >
              Crear categoria
              <MdLibraryAdd className=" text-xl text-neutral-900" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Categories;
