import { MouseEvent, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import InputField from '../../Forms&Fields/Pure/InputField';

//FORMIK
import * as yup from 'yup';
import { FormikProps, useFormik } from 'formik';
import { Category, PostCategory } from '../../../Interfaces/Category.interface';
import SelectIcon from '../../SelectIcon/Pure/SelectIcon';
import { CustomIcon } from '../../SelectIcon/Molecule/CustomIcon';
import {
  editCategory,
  saveCategory,
} from '../../../services/Category.services';
import { useModal } from '../../../hooks/useModal';
import { useReloadData } from '../../../hooks/useReloadData';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../../Interfaces/Redux.interface';
type CreateCategoryProps = {
  isSubcategory?: boolean;
};

export const EditCategory = ({
  isSubcategory = false,
}: CreateCategoryProps) => {
  const { handleModal } = useModal();
  const reloadData = useReloadData();
  const category_id = useSelector(
    (state: ReduxState) => state?.app?.temporal_data
  );
  const category = useSelector((state: ReduxState) =>
    state.user.user.my_categories.find((cat) => cat._id === category_id)
  );

  const initialValues = {
    name: category?.name || '',
    icon: category?.icon || null,
  };

  const validationSchema = yup.object({
    name: yup.string().required(),
    icon: yup.string(),
  });

  const onSubmit = async (): Promise<void> => {
    try {
      await editCategory(values, category_id);
      handleModal(false, '');
      reloadData();
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error('Unexpected error', err);
      }
    }
  };

  // Create Category
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    errors,
    values,
    touched,
    setFieldValue,
  }: FormikProps<PostCategory> = useFormik<PostCategory>({
    onSubmit,
    initialValues,
    validationSchema,
  });

  return (
    <div className="flex flex-col gap-2">
      <h3 className="subtitle">Crear una categoria</h3>
      <form id="category-form" onSubmit={handleSubmit}>
        <InputField
          label="Nombre de la categoria"
          inputName="name"
          labelClassname="label-style"
          inputClassname={'input-style'}
          value={values.name}
          handleBlur={handleBlur}
          handleChange={handleChange}
          errorMessage={touched.name && errors.name ? errors.name : null}
        />

        <SelectIcon
          setFieldValue={setFieldValue}
          name={'icon'}
          value={values.icon || ''}
        />
      </form>

      <button
        form="category-form"
        className="btn-input font-bold text-lg mt-2 mb-2"
        type="submit"
      >
        Guardar
      </button>
    </div>
  );
};
