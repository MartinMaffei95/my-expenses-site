import {
  Collapse,
  ListItem,
  ListItemButton,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { MouseEvent, useState } from 'react';
import {
  MdDeleteOutline,
  MdLibraryAdd,
  MdModeEditOutline,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md';
import { useModal } from '../../../hooks/useModal';
import { useReloadData } from '../../../hooks/useReloadData';
import { Category } from '../../../Interfaces/Category.interface';
import { deleteCategory } from '../../../services/Category.services';
import { CustomIcon } from '../../SelectIcon/Molecule/CustomIcon';

type CategoryLiProps = {
  category: Category;
  isSubCategory?: boolean;
  fromUser?: boolean;
};
export const CategoryLi = ({
  category,
  isSubCategory = false,
  fromUser = false,
}: CategoryLiProps) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  const { handleModal } = useModal();

  const reloadData = useReloadData();

  const user_id = JSON.parse(localStorage.getItem('user_id') as string);

  const removeCategory = async (e: MouseEvent<HTMLElement>) => {
    const { id } = e.currentTarget;
    try {
      await deleteCategory(id);
      reloadData();
    } catch (e) {
      alert(e);
    }
  };

  const updateCategory = async (e: MouseEvent<HTMLElement>) => {
    const { id } = e.currentTarget;
    try {
      // await editCategory(id);
      handleModal(true, 'EDIT_CATEGORY', id);
      reloadData();
    } catch (e) {
      alert(e);
    }
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

              isSubCategory ? 'pl-4 font-light' : 'font-normal'

            }`}
          >
            {category.icon ? (
              <span className="">
                <CustomIcon iconName={category.icon} />
              </span>
            ) : null}

            {category.name}
          </span>
        </ListItemButton>

        {/* BUTTON FOR ADD A SUB CATEGORY */}
        <div className="basis-1/4  flex justify-around items-center">
          <ToggleButtonGroup>
            {!isSubCategory && fromUser ? (
              <ToggleButton onClick={(e) => console.log(e)} value={'add'}>
                <MdLibraryAdd className="text-xl text-neutral-900" />

              </ToggleButton>
            ) : null}
            {/* IF THE USER IS THE SAME WHO CREATE THE CATEGORY THIS BUTTON IS RENDERED */}
            {/* USES FOR DELETE A CATEGORY(or SUBCATEGORY) */}

            {fromUser ? (
              <>
                <ToggleButton
                  id={category._id}
                  onClick={(e) => removeCategory(e)}
                  value={'delete'}
                >
                  <MdDeleteOutline className="text-xl text-neutral-900" />

                </ToggleButton>
                <ToggleButton
                  id={category._id}
                  value={'edit'}
                  onClick={updateCategory}
                >
                  <MdModeEditOutline className="text-xl text-neutral-900" />

                </ToggleButton>
              </>
            ) : null}
          </ToggleButtonGroup>
        </div>
      </ListItem>
      {/* THE SUB CATEGORY (IF HAVE ONE) */}
      <Collapse in={open} timeout="auto" unmountOnExit>
        {category?.sub_category
          ? category?.sub_category.map((cat: Category) => (
              <CategoryLi
                key={cat._id}
                category={cat}
                isSubCategory
                fromUser={category.created_by === user_id}
              />
            ))
          : null}
      </Collapse>
    </>
  );
};
