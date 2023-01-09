import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import {
  MdDeleteOutline,
  MdLibraryAdd,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md';
import { useSelector } from 'react-redux';
import { CustomIcon } from '../../components/Pure/CustomIcon';
import { Category } from '../../components/Pure/SelectField';
import SelectIcon from '../../components/SelectIcon';
import { useModal } from '../../hooks/useModal';
import { UserState } from '../../Interfaces/Redux.interface';

const Categories = () => {
  const [appCategories, setAppCategories] = useState<Category[]>([]);
  const [userCategories, setUserCategories] = useState<Category[]>([]);
  const categories = useSelector(
    (state: UserState) => state.user.user.my_categories
  );

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

  type CategoryLi = {
    category: Category;
    isSubCategory?: boolean;
    fromUser?: boolean;
  };
  const CategoryLi = ({
    category,
    isSubCategory = false,
    fromUser = false,
  }: CategoryLi) => {
    const [open, setOpen] = useState(false);
    const handleClick = () => {
      setOpen(!open);
    };
    return (
      <>
        <ListItem className={`border-b pb-1 pt-1 flex items-center`}>
          <ListItemButton onClick={handleClick}>
            {category.sub_category ? (
              <span className="w-6">
                {open ? (
                  <MdOutlineKeyboardArrowDown />
                ) : (
                  <MdOutlineKeyboardArrowRight />
                )}
              </span>
            ) : (
              <span className="w-6"></span>
            )}

            <span
              className={`basis-3/4 flex items-center gap-2 ${
                isSubCategory ? 'pl-4 ' : 'font-semibold'
              }`}
            >
              {category.icon ? (
                <span className="">
                  <CustomIcon iconName={category.icon} />
                </span>
              ) : null}

              {category.name}
            </span>

            <div className="basis-1/4  flex justify-around items-center">
              {!isSubCategory ? (
                <button className="text-xl">
                  <MdLibraryAdd />
                </button>
              ) : null}

              {fromUser ? (
                <button className="text-xl">
                  <MdDeleteOutline />
                </button>
              ) : null}
            </div>
          </ListItemButton>
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          {category?.sub_category
            ? category?.sub_category.map((cat: Category) => (
                <CategoryLi key={cat._id} category={cat} isSubCategory />
              ))
            : null}
        </Collapse>
      </>
    );
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
            <CategoryLi key={cat._id} category={cat} />
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
